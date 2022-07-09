using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tracking_task.Models
{
    public class Task
    {
        public int ID { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Details { get; set; }
        [Required]
        public DateTime Date { get; set; }

        [Required]
        //Foreign Keys
        [ForeignKey("Assignee")]

        public int? Assignee_id { get; set; }
        [Required]

        [ForeignKey("Project")]
        public int? Project_id { get; set; }

        //Navigation Properties
        public virtual Assignee Assignee { get; set; }
        public virtual Project Project { get; set; }

    }
}
