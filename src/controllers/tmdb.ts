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
    const { data } = await axios.get(
      "https://imdb-api.projects.thetuhin.com/search?query=" + query
    );
    console.log('hello')
    if (!data.results[0]) {
      return new Error("Empty");
    }
    const detailData = await axios.get(
      "https://imdb-api.projects.thetuhin.com/title/" + data?.results[0]?.id
    );
    if (!detailData) {
      return new Error("No data found");
    }
    return res.status(200).json({ message: "result", data: detailData.data });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

export { getMovie };
