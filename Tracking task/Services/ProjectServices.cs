using System.Collections.Generic;
using Tracking_task.DTO;
using Tracking_task.Models;
using Tracking_task.Reposetories;

namespace Tracking_task.Services
{
    public class ProjectServices : IProjectServices
    {
        private readonly IProjectRepo ProjectRepo;


        public ProjectServices(IProjectRepo ProjectRepo)
        {
            this.ProjectRepo = ProjectRepo;
        }
        public List<ProjectDTO> GetAll()
        {
            return convert_List_ProjectToDTO(ProjectRepo.GetAll());
        }


        public List<ProjectDTO> convert_List_ProjectToDTO(List<Project> projects)
        {
            List<ProjectDTO> ProjectList = new List<ProjectDTO>();
            foreach (Project project in projects)
            {
                ProjectList.Add(convertProjectToDTO(project));
            }
            return ProjectList;
        }
        public ProjectDTO convertProjectToDTO(Project project)
        {
            return new ProjectDTO()
            {
                ID = project.ID,
                Name = project.Name
            };
        }
    }
}
