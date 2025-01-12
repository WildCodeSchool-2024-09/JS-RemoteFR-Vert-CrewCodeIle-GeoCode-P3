import type { RequestHandler } from "express";

const getApiCodesPostaux: RequestHandler = async (req, res, next) => {
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
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { getApiCodesPostaux };
