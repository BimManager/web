// Copyright 2019 Samolet LLC
// Author: kkozlov
// tcp_server.c

#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#include <sys/types.h>
#include <sys/socket.h>

#include <netinet/in.h>

#define BUFF_SIZE	1024
#define PORT		9002

static int	create_server(void);

int		main(void)
{
  return (create_server());
};

int		create_server(void)
{
  char			server_message[BUFF_SIZE];
  int			server_socket;
  struct sockaddr_in	server_address;
  int			client_socket;

  strcpy(server_message, "You have reached the server!");
  server_socket = socket(AF_INET, SOCK_STREAM, 0);
  server_address.sin_family = AF_INET;
  server_address.sin_port = htons(PORT);
  server_address.sin_addr.s_addr = INADDR_ANY;
  bind(server_socket, (struct sockaddr *)&server_address, sizeof(server_address));
  listen(server_socket, 7);
  client_socket = accept(server_socket, NULL, NULL);
  send(client_socket, server_message, sizeof(server_message), 0);
  close(server_socket);
  return (0);
}
