import type { RequestHandler } from "express";

const getApiAdressDataGouv: RequestHandler = async (req, res) => {
  try {
    // Fetch api "code postaux"
    const { query } = req.body;
    const response = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${query}&limit=15`,
    );
    // Respond with the query in JSON format
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.sendStatus(503);
  }
};

export default { getApiAdressDataGouv };
