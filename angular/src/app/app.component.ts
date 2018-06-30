import { Component, OnInit } from '@angular/core';
import { JobService } from './services/job.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  jobs: any;
  jobsToDisplay: any;
  filter: String = '';

  constructor(private jobService: JobService) {}
  ngOnInit() {
    this.jobService.getArticles().subscribe(jobs => {
      this.jobs = jobs;
      this.jobsToDisplay = jobs;
    });
  }
  onKey(value: string) {
    this.filter = value;
    this.jobsToDisplay = this.jobs.filter(job =>
      job.title.includes(this.filter)
    );
  }
}
