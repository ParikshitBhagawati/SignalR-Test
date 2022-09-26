using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalR.Api.Hubs
{
    public class MessageHub : Hub
    {
        public static string UserName = "";
        private readonly ILogger<MessageHub> _logger;
        private readonly IHubContext<MessageHub> _hubContext;
        public MessageHub(ILogger<MessageHub> logger, IHubContext<MessageHub> hubContext)
        {
            _logger = logger;
            _hubContext = hubContext;
        }

        public async Task SendToUser(string connectionId, string message)
        {
            await _hubContext.Clients.Client(connectionId).SendAsync("ReceiveMessage", message);
        }

        public string GetConnectionId() => Context.ConnectionId;

            
    }
}