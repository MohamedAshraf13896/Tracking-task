using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Tracking_task.Models;

namespace Tracking_task.DTO
{
    public class TaskByIdDTO
    {
        public int ID { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Details { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public int? Assignee_ID { get; set; }
        public int? Project_ID { get; set; }
    }
}
