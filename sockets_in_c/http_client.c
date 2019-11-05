// Copyright 2019 Samolet LLC
// Author: kkozlov
// http_client.c

#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#include <sys/types.h>
#include <sys/socket.h>

#include <netinet/in.h>
#include <arpa/inet.h>

#define PORT		80
#define BUFF_SIZE	1024

static int	create_http_client(int argc, char **argv);

int		main(int argc, char **argv)
{
  return (create_http_client(argc, argv));
}

int		create_http_client(int argc, char **argv)
{
  char			*address;
  int			client_socket;
  int			connection_status;
  struct sockaddr_in	remote_address;
  char			request[BUFF_SIZE];
  char			response[BUFF_SIZE];

  if (argc < 2)
  {
    fprintf(stderr, "usage: http_client <address>\n");
    return (1);
  }
  address = argv[1];
  client_socket = socket(AF_INET, SOCK_STREAM, 0);
  remote_address.sin_family = AF_INET;
  remote_address.sin_port = htons(PORT);
  inet_aton(address, &remote_address.sin_addr.s_addr);
  connection_status = connect(
      client_socket,(struct sockaddr *)&remote_address, sizeof(remote_address));
  if (-1 == connection_status)
  {
    fprintf(stderr, "No connection has been established.\n");
    return (2);
  }
  memset(request, 0, BUFF_SIZE);
  strcpy(request, "GET / HTTP/1.1\r\n\r\n");
  send(client_socket, request, strlen(request), 0);
  recv(client_socket, &response, BUFF_SIZE, 0);
  printf("Response: %s\n", response);
  close(client_socket);
  return (0);
}
