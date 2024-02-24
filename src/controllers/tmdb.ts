import { Request, Response } from "express";
import { ACCESS_TOKEN, TMDB_URI } from "../config";
import axios from "axios";

const API = {
  search: TMDB_URI + "/search/tv?query=",
  logo: TMDB_URI + "/tv",
};

async function getTMDBLogo(id: number) {
  const { data } = await axios.get(`${API.logo}/${id}/images`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      accept: "application/json",
    },
  });

  const infoData = data;
  return infoData;
}

async function getMovie(req: Request, res: Response) {
  try {
    const { query } = req.query;
    const { data } = await axios.get(API.search + query, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });
    let infoData: any = data;
    infoData.results = infoData.results.filter(
      (data: any) => data.original_language === "ja"
    );

    if (infoData.results.length <= 0)
      return res.status(404).json({ message: "Empty", result: { logos: [] } });

    console.log(infoData.results[0]);
    const result = await getTMDBLogo(infoData.results[0].id);
    return res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export { getMovie };
