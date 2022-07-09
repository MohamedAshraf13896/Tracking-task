using System.Collections.Generic;
using Tracking_task.Models;

namespace Tracking_task.Reposetories
{
    public interface IProjectRepo
    {
        List<Project> GetAll();
    }
}