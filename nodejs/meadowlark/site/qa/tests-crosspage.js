const Browser = require("zombie");
const assert = require("chai").assert;

const port = process.env.PORT || 3000;

let browser;
suite("Cross-Page Tests",
      () => {
	  setup(() => {
	      browser = new Browser();
	  });
	  test("requesting a group rate quote form the hood river tour page"
	       + "should populate the referrer field", (done) => {
		   let referrer = `http://localhost:${port}/tours/hood-river`;
		   console.log(referrer);
		   browser.visit(referrer, () => {
		       browser
			   .clickLink(
			       ".requestGroupRate",
			       () => {
				   console.log(browser.field("referrer").value);
				   assert(browser.field("referrer").value === referrer);
				   done();
			       });
		   });
	       });
	  test("requesting a group rate quote form the oregon tour page"
	       + "should populate the referrer field", (done) => {
		   let referrer = "http://localhost:3000/tours/oregon-coast";
		   browser.visit(referrer, () => {
		       browser
			   .clickLink(
			       ".requestGroupRate",
			       () => {
				   assert(browser.field("referrer").value === referrer);
				   done();
			       });
		   });
	       });
	  test("requesting the \"the request group rate\" directly should result"
	       + "in an empty referrer field", (done) => {
		   let referrer = "http://localhost:3000/tours/request-group-rate";
		   browser.visit(referrer, () => {

		       assert(browser.field("referrer").value === referrer);
		       done();
		   });
	       });
      });
		       
		   
