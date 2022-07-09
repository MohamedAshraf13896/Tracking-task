using System.Collections.Generic;
using System.Linq;
using Tracking_task.Models;

namespace Tracking_task.Reposetories
{
    public class ProjectRepo : IProjectRepo

    {
        Context context;
        public ProjectRepo(Context context)
        {
            this.context = context;
        }
        public List<Project> GetAll()
        {
            return context.Projects.ToList();
        }

    }
}
