using Microsoft.AspNetCore.Mvc;
using SignalR.Api.Models;
using SignalR.Api.Hubs;
namespace SignalR.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class MessageController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly MessageHub _hub;

    private readonly ILogger<MessageController> _logger;

    public MessageController(ILogger<MessageController> logger, 
        MessageHub hub)
    {
        _logger = logger;
        _hub = hub;
    }
    
    [HttpPost("/SendMessage")]
    public async Task<IActionResult> Invoke(string name, string connectionId)
    {
        await Task.Delay(3000); // Call to ETP + DB ops etc.
        await _hub.SendToUser(connectionId, $"{name}-{connectionId}"); // Needs to be on the listener of webjob receive event.
        return Ok(connectionId);
    }
}
