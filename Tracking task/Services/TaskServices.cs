using System.Collections.Generic;
using Tracking_task.DTO;
using Tracking_task.Reposetories;
using Tracking_task.Models;

namespace Tracking_task.Services
{
    public class TaskServices : ITaskServices
    {
        private readonly ITaskRepo TaskRepo;


        public TaskServices(ITaskRepo TaskRepo)
        {
            this.TaskRepo = TaskRepo;
        }
        public int Create(TaskByIdDTO task)
        {
            return TaskRepo.Create(convertDTOtoTask(task));
        }

        public int Delete(int id)
        {
            return TaskRepo.Delete(id);
        }

        public List<TaskDTO> GetAll()
        {
            var x = convert_List_TaskToDTO(TaskRepo.GetAll());
            return x;
        }


        public TaskDTO GetById(int id)
        {
            return convertTaskToDTO(TaskRepo.GetById(id));
        }

        public int Update(TaskByIdDTO task)
        {
            return TaskRepo.Update(convertDTOtoTask(task));
        }

        public List<TaskDTO> convert_List_TaskToDTO(List<Task> tasks)
        {
            List<TaskDTO> Tasklist = new List<TaskDTO>();
            foreach (Task task in tasks)
            {
                Tasklist.Add(convertTaskToDTO(task));
            }
            return Tasklist;
        }

        public TaskDTO convertTaskToDTO(Task task)
        {
            return new TaskDTO()
            {
                ID = task.ID,
                Title = task.Title,
                Details = task.Details,
                Date = task.Date,
                Assignee_Name = task.Assignee.Name,
                Project_Name = task.Project.Name
            };
        }

        public Task convertDTOtoTask(TaskByIdDTO task)
        {
            return new Task()
            {
                ID = task.ID,
                Title = task.Title,
                Details = task.Details,
                Date = task.Date,
                Assignee_id = task.Assignee_ID,
                Project_id = task.Project_ID,
            };
        }

    }
}
