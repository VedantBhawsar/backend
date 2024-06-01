import axios from 'axios';
import { API_URL } from '../config';
import { ANIME } from '@consumet/extensions';

const gogo = new ANIME.Gogoanime();

class Workers {
  constructor() {
    this.fetchNews();
  }
  public async fetchNews() {
    try {
      await axios.get(API_URL + 'news/fetch-feeds');
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export default Workers;
