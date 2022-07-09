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

    public class TaskController : ControllerBase
    {
        private readonly ITaskServices TaskService;

        public TaskController(ITaskServices TaskService)
        {
            this.TaskService = TaskService;
        }

        //api/Task
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(TaskService.GetAll());
        }

        //api/Task/2
        [HttpGet("{id:int}", Name = "GetOneTask")]
        public IActionResult GetById(int id)
        {
            return Ok(TaskService.GetById(id));
        }

        //api/Task
        [HttpPost]
        public IActionResult Create(TaskByIdDTO taskDTO)
        {
            if (taskDTO == null)
            {
                return BadRequest(ModelState);
            }
            if (ModelState.IsValid)
            {
                int result = TaskService.Create(taskDTO);
                if (result > 0)
                {
                    taskDTO.ID = result;
                    string? url = Url.Link("GetOneTask", new { id = result });
                    return Created(url, taskDTO);
                }
            }
            return StatusCode(500);
        }

        //api/Task/2
        [HttpPut("{id:int}")]
        public IActionResult Update(int id, TaskByIdDTO taskDTO)
        {
            if (id != taskDTO.ID)
            {
                return BadRequest();
            }
            if (ModelState.IsValid)
            {
                int result = TaskService.Update(taskDTO);
                if (result > 0)
                {
                    return StatusCode(204, taskDTO);
                }
                return StatusCode(500);
            }
            return BadRequest(ModelState);
        }

        //api/Branch/2
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            int result = TaskService.Delete(id);
            if (result > 0)
            {
                return Ok();
            }
            return StatusCode(500);
        }
    }
}

