interface ICron {
  span: string; // 'once|every minute|every hour|every day|every week|every month'
  at_minute?: number; // 0-59
  at_hour?: number; // 0-23
  at_day?: number; // 1-31
  at_month?: number; // 0-11, where 0 is January (don't use 1-12)
  at_year?: number; // yyyy
  on_weekday?: Number // 0-6, where 0 is Sunday (use only when span is week)
}


interface ISchedule {
  _id?: any;
  user_id: any;
  title: string;
  cron: any; // time when to execute the job
  job: string; // 'scraper/sitemap', 'scraper/siteurl', 'slack:prerender-queue-handler'
  job_params: any;
}

export { ISchedule };
