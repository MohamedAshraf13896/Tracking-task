using System.Collections.Generic;
using System.Linq;
using Tracking_task.Models;

namespace Tracking_task.Reposetories
{
    public class AssigneeRepo : IAssigneeRepo
    {
        Context context;
        public AssigneeRepo(Context context)
        {
            this.context = context;
        }
        public List<Assignee> GetAll()
        {
            return context.Assignees.ToList();
        }
    }
}
