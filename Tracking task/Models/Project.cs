using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Tracking_task.Models
{
    public class Project
    {
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }

        //Navigation Properties
        public virtual List<Task> Tasks { get; set; }
    }
}
