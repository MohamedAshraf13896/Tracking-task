using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Tracking_task.Models;

namespace Tracking_task.DTO
{
    public class TaskDTO
    {
        public int ID { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Details { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public string Assignee_Name { get; set; }
        public string Project_Name { get; set; }

    }
}
