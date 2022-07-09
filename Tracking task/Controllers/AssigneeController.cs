using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tracking_task.DTO;
using Tracking_task.Services;

namespace Tracking_task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class AssigneeController : ControllerBase
    {
        private readonly IAssigneeServices AssigneeServices;

        public AssigneeController(IAssigneeServices AssigneeServices)
        {
            this.AssigneeServices = AssigneeServices;
        }

        //api/Projec
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(AssigneeServices.GetAll());
        }
    }
}
