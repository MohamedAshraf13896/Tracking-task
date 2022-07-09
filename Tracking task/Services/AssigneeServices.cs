using System.Collections.Generic;
using Tracking_task.DTO;
using Tracking_task.Models;
using Tracking_task.Reposetories;

namespace Tracking_task.Services
{
    public class AssigneeServices : IAssigneeServices
    {
        private readonly IAssigneeRepo assigneeRepo;


        public AssigneeServices(IAssigneeRepo assigneeRepo)
        {
            this.assigneeRepo = assigneeRepo;
        }
        public List<AssigneeDTO> GetAll()
        {
            return convert_List_AssigneeToDTO(assigneeRepo.GetAll());
        }
        public List<AssigneeDTO> convert_List_AssigneeToDTO(List<Assignee> assignees)
        {
            List<AssigneeDTO> AssigneeList = new List<AssigneeDTO>();
            foreach (Assignee assignee in assignees)
            {
                AssigneeList.Add(convertAssigneeToDTO(assignee));
            }
            return AssigneeList;
        }
        public AssigneeDTO convertAssigneeToDTO(Assignee assignee)
        {
            return new AssigneeDTO()
            {
                ID = assignee.ID,
                Name = assignee.Name,
            };
        }
    }
}
