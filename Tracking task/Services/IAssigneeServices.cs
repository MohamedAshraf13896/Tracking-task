using System.Collections.Generic;
using Tracking_task.DTO;
using Tracking_task.Models;

namespace Tracking_task.Services
{
    public interface IAssigneeServices
    {
        AssigneeDTO convertAssigneeToDTO(Assignee assignee);
        List<AssigneeDTO> convert_List_AssigneeToDTO(List<Assignee> assignees);
        List<AssigneeDTO> GetAll();
    }
}