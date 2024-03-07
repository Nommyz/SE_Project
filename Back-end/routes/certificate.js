const express = require("express");
const certificate = express.Router();
const PDFDocument = require("pdfkit");
const fs = require("fs");
const db = require("../models");
const { QueryTypes } = require("sequelize");

certificate.get("/:name", async (req, res) => {
  const name = req.params.name;

  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
  });

  // Pipe the PDF into an name.pdf file
  doc.pipe(
    fs.createWriteStream(`CertificateGenerator/out/${name.toUpperCase()}.pdf`)
  );

  // Draw the certificate image
  doc.image("CertificateGenerator/template/template2.png", 0, 0, {
    width: 842,
  });

  // Set the font
  doc.font("CertificateGenerator/font/Lato-Italic.ttf");

  doc.fontSize(40).text(name, 15, 275, {
    align: "center",
  });

  // Finalize the PDF and end the stream
  doc.end();

  return res
    .status(200)
    .json({ ok: true, message: "generate certificate successfully" });
});

module.exports = certificate;
