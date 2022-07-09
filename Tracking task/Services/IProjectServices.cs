using System.Collections.Generic;
using Tracking_task.DTO;
using Tracking_task.Models;

namespace Tracking_task.Services
{
    public interface IProjectServices
    {
        ProjectDTO convertProjectToDTO(Project project);
        List<ProjectDTO> convert_List_ProjectToDTO(List<Project> projects);
        List<ProjectDTO> GetAll();
    }
}