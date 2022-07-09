using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace Tracking_task.DTO
{
    public class ProjectDTO
    {
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }

    }
}
