using System.Collections.Generic;
using Tracking_task.DTO;
using Tracking_task.Models;

namespace Tracking_task.Services
{
    public interface ITaskServices
    {
        Task convertDTOtoTask(TaskByIdDTO task);
        TaskDTO convertTaskToDTO(Task task);
        List<TaskDTO> convert_List_TaskToDTO(List<Task> tasks);
        int Create(TaskByIdDTO task);
        int Delete(int id);
        List<TaskDTO> GetAll();
        TaskDTO GetById(int id);
        int Update(TaskByIdDTO task);
    }
}