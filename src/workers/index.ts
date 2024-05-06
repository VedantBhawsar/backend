import axios from 'axios';
import { API_URL } from '../config';

export class Workers {
  constructor() {
    this.fetchNews();
  }
  public async fetchNews() {
    try {
      console.log('Fetching news');
      await axios.get(API_URL + 'news/fetch-feeds');
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
