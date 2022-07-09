using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Tracking_task.Models;

namespace Tracking_task.Reposetories
{
    public class TaskRepo : ITaskRepo
    {
        Context context;
        public TaskRepo(Context context)
        {
            this.context = context;
        }

        public int Create(Task task)
        {
            try
            {
                context.Tasks.Add(task);
                context.SaveChanges();
                return task.ID;
            }
            catch (Exception ex)
            {
                return -1;
            }

        }

        public int Delete(int id)
        {
            try
            {
                context.Tasks.Remove(GetById(id));
                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public List<Task> GetAll()
        {
            return context.Tasks.Include(x=> x.Assignee).Include(x=>x.Project).ToList();
        }

        public Task GetById(int id)
        {
            return context.Tasks.Include(x => x.Assignee).Include(x => x.Project).SingleOrDefault(s => s.ID == id);
        }

        public int Update(Task task)
        {
            Task oldTask = GetById(task.ID);

            try
            {
                oldTask.Title = task.Title;
                oldTask.Details = task.Details;
                oldTask.Date = task.Date;
                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
    }
}
