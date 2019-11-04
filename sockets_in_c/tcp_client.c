// Copyright 2019 LLC
// Author: kkozlov
// tcp_client.c

#include <stdio.h>
#include <stdlib.h>

#include <sys/types.h>
#include <sys/socket.h>

#include <netinet/in.h>

#define PORT		9002
#define BUFF_SIZE	1024

static int	create_client(void);

int		main(void)
{
  return (create_client());
}

int		create_client(void)
{
  int			network_socket;
  struct sockaddr_in	server_address;
  int			connection_status;
  char			server_response[BUFF_SIZE];

  network_socket = socket(AF_INET, SOCK_STREAM, 0);
  server_address.sin_family = AF_INET;
  server_address.sin_port = htons(PORT);
  server_address.sin_addr.s_addr = INADDR_ANY;
  connection_status = connect(network_socket,
                              (struct sockaddr *)&server_address, sizeof(server_address));
  if (connection_status == -1)
  {
    fprintf(stderr, "There was an error connecting "
            "to the remote socket. connection returned %d.\n",
            connection_status);
    return (1);
  }
  recv(network_socket, server_response, sizeof(server_response), 0);
  fprintf(stdout, "%s\n", server_response);
  close(network_socket);
  return (0);

}
