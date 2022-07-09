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
    public class ProjectController : ControllerBase
    {
        private readonly IProjectServices ProjectService;

        public ProjectController(IProjectServices ProjectService)
        {
            this.ProjectService = ProjectService;
        }

        //api/Projec
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(ProjectService.GetAll());
        }
    }
}
