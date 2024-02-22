import { Request, Response } from "express";

const TMDB_URI = "";

class TmdbController {
  API = {
    search: TMDB_URI + "/search/tv?query=",
    logo: TMDB_URI + "/tv",
  };

  async getTMDBLogo(id: number) {
    const res = await fetch(`images`, {
      headers: {
        Authorization: `Bearer 4eab1c048a2e2e8a282f2b01dcecc3e8`,
        accept: "application/json",
      },
    });
    console.log(res);
    const infoData = await res.json();
    return infoData;
  }

  async getMovie(req: Request, res: Response) {
    const searchParams = req.query;
    const response = await fetch(this.API.search + searchParams, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_KEY}`,
        accept: "application/json",
      },
    });

    let infoData: any = await response.json();
    infoData.results = infoData.results.filter(
      (data: any) => data.original_language === "ja"
    );

    if (infoData.results.length <= 0)
      return res.status(404).json({ message: "Empty", result: { logos: [] } });

    const result = await this.getTMDBLogo(infoData.results[0].id);
    return res.status(200).json({ result });
  }
}

export default new TmdbController();
