import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import JobService from './services/jobs.service';
const newsService = new JobService();
const app = express();

app.use(cors());

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('/jobs', (req, res) => {
  let articles = [];
  newsService.getJobs().subscribe(
    article => {
      // console.log(article);
      articles.push(article);
    },
    error => {
      console.log(error);
    },
    () => res.json(articles)
  );
});

app.get('*', (req, res) => res.sendFile(path.join(publicPath, 'index.html')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server listening port ${port}`));
