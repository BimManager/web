// Copyright 2019 Samolet LLC
// Author: kkozlov
// http_server.c

#include <unistd.h>

#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>

#define BUFF_SIZE	1024
#define PORT		8001

static int	create_http_server(void);

int		main(void)
{
  return (create_http_server());
}

int		create_http_server(void)
{
  FILE			*html_data;
  char			response_data[BUFF_SIZE];
  char			http_header[BUFF_SIZE];
  int			server_socket;
  int			client_socket;
  struct sockaddr_in	server_address;

  memset(response_data, 0, BUFF_SIZE);
  memset(http_header, 0, BUFF_SIZE);
  html_data = fopen("index.html", "r");
  fread(response_data, sizeof(char), BUFF_SIZE, html_data);
  write(1, response_data, strlen(response_data));
  strcpy(http_header, "HTTP/1.1 200 OK\r\n\n");
  strcat(http_header, response_data);
  server_socket = socket(AF_INET, SOCK_STREAM, 0);
  server_address.sin_family = AF_INET;
  server_address.sin_port = htons(PORT);
  server_address.sin_addr.s_addr = INADDR_ANY;
  bind(server_socket, (struct sockaddr *)&server_address, sizeof(server_address));
  listen(server_socket, 7);
  while (1)
  {
    client_socket = accept(server_socket, NULL, NULL);
    send(client_socket, http_header, sizeof(http_header), 0);
    close(client_socket);
  }
  fclose(html_data);
  return (0);
}
