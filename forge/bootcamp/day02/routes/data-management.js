const express = require('express');
const { HubsApi, ProjectsApi, FoldersApi, ItemsApi } = require('forge-apis');

const { OAuth } = require('./common/oauth');

const router = express.Router();

router.get('/datamanagement', async (req ,res) => {
  debugger;
  if (!req.query.id) return res.status(400).end();
  const href = decodeURIComponent(req.query.id);
  const oauth = new OAuth(req.session);
  const internalToken = await oauth.getInternalToken();
  if ('#' === href) {
    getHubs(oauth.getClient(), internalToken, res);
  } else {
    const params = href.split('/');
    const resourceName = params[params.length - 2];
    const resourceId = params[params.length - 1];
    switch (resourceName) {
    case 'hubs':
      getProjects(resourceId, oauth.getClient(), internalToken, res);
      break;
    case 'projects':
      const hubId = params[params.length - 3];
      getFolders(hubId, resourceId, oauth.getClient(), internalToken, res);
      break;
    case 'folders': {
      const projectId = params[params.length - 3];
      getFolderContents(projectId, resourceId, oauth.getClient(), internalToken, res);
      break;
    }
    case 'items': {
      const projectId = params[params.length - 3];
      getVersions(projectId, resourceId, oauth.getClient(), internalToken, res);
      break;
    }
    }
  }
});

async function getHubs(oauthClient, credentials, res) {
  const hubs = new HubsApi();
  const data = await hubs.getHubs({}, oauthClient, credentials);
  res.json(data.body.data.map((hub) => {
    let hubType;
    switch (hub.attributes.extension.type) {
    case 'hubs:autodesk.core:Hub':
      hubType = 'hubs';
      break;
    case 'hubs:autodesk.a360:PersonalHub':
      hubType = 'personalHub';
      break;
      case 'hubs:autodesk.bim360:Account':
      hubType = 'bim360Hubs';
      break;
    }
    return createTreeNode(
      hub.links.self.href,
      hub.attributes.name,
      hubType,
      true
    );
  }));
}

async function getProjects(hubId, oauthClient, credentials, res) {
  const projects = new ProjectsApi();
  const data = await projects.getHubProjects(hubId, {}, oauthClient, credentials);
  res.json(data.body.data.map((project) => {
    let projectType = 'projects';
    switch (project.attributes.extension.type) {
    case 'projects:autodesk.core:Project':
      projectType = 'a360projects';
      break;
    case 'projects:autodesk.bim360:Project':
      projectType = 'bim360projects';
      break;
    }
    return createTreeNode(
      project.links.self.href,
      project.attributes.name,
      projectType,
      true
    );
  }));
}

async function getFolders(hubId, projectId, oauthClient, credentials, res) {
  const projects = new ProjectsApi();
  const folders = await projects.getProjectTopFolders(
    hubId,projectId, oauthClient, credentials);
  res.json(folders.body.data.map((item) => {
    return createTreeNode(
      item.links.self.href,
      null === item.attributes.displayName
        ? item.attributes.name : item.attributes.displayName,
      item.type,
      true
    );
  }));
}

async function getFolderContents(projectId, folderId, oauthClient, credentials, res) {
  debugger;
  const folders = new FoldersApi();
  const contents = await folders.getFolderContents(
    projectId, folderId, {}, oauthClient, credentials);
  const treeNodes = contents.body.data.map((item) => {
    const name =
          !item.attributes.name
      ? item.attributes.displayName
      : item.attributes.name;
    if (name !== '') {
      return createTreeNode(
        item.links.self.href,
        name,
        item.type,
        true
      );
    } else {
      return null;
    }
  });
  res.json(treeNodes.filter((node) => node !== null));
}

async function getVersions(projectId, itemId, oauthClient, credentials, res) {
  debugger;
  const items = new ItemsApi();
  const versions = await items.getItemVersions(
    projectId, itemId, {}, oauthClient, credentials);
  res.json(versions.body.data.map((version) => {
    const dateFormated = new Date(version.attributes.lastModifiedTime).toLocaleString();
    const versionist = version.id.match(/^(.*)\?version=(\d+)$/)[2];
    const viewerUrn = (version.relationships && version.relationships.derivatives
                        ? version.relationships.derivatives.data.id
                        : null);
    return createTreeNode(
      viewerUrn,
      decodeURI('v' + versionist + ': ' + dateFormated + 'by'
                + version.attributes.lastModifiedUserName),
      (viewerUrn != null ? 'versions' : 'unsupported'),
      false
    );
  }));
}

function createTreeNode(_id, _text, _type, _children) {
  return { id: _id, text: _text, type: _type, children: _children };
}


module.exports = router;
