using System.Collections.Generic;
using Tracking_task.Models;

namespace Tracking_task.Reposetories
{
    public interface ITaskRepo
    {
        int Create(Task task);
        int Delete(int id);
        List<Task> GetAll();
        Task GetById(int id);
        int Update(Task task);
    }
}