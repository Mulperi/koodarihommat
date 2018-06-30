import { Observable, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import * as rp from 'request-promise';
import * as cheerio from 'cheerio';

export default class NewsService {
  constructor() {}

  public getJobs(): Observable<string> {
    console.log('Getting jobs...');
    let options = {
      uri: `https://paikat.te-palvelut.fi/tpt-api/tyopaikat.rss?hakusana=ohjelmistokehitt%C3%A4j%C3%A4%20OR%20sovelluskehitt%C3%A4j%C3%A4%20OR%20developer%20OR%20%22software%20developer%22%20OR%20koodari%20OR%20devaaja%20OR%20%22full%20stack%22%20OR%20%22full-stack%22%20OR%20%22fullstack%22&hakusanakentta=sanahaku&valitutAmmattialat=2&valitutAmmattialat=3&ilmoitettuPvm=1&vuokrapaikka=---`,
      transform: body => {
        return cheerio.load(body, { xmlMode: true });
      }
    };

    return from(rp(options)).pipe(
      concatMap(($: any) => {
        return $('item').map(function(i, elem) {
          return {
            title: $(this)
              .children()
              .first()
              .text(),
            description: $(this)
              .children()
              .eq(2)
              .text(),
            link: $(this)
              .children()
              .eq(1)
              .text(),
            timestamp: $(this)
              .children()
              .eq(4)
              .text()
              .slice(5, 25)
          };
        });
      })
    );
  }
}
