# 🚀 Cellstronaut

[![Demo](https://img.shields.io/badge/Demo-YouTube-red)](https://youtu.be/7WPAcLXrtyc)  
[![Website](https://img.shields.io/badge/Website-Live-blue)](https://mossware.github.io/cellstronaut/)  
[![Space Apps](https://img.shields.io/badge/Space%20Apps-Challenge-yellowgreen)](https://www.spaceappschallenge.org/2025/find-a-team/mossy/?tab=project)

---

## ✨ Summary
Science often hides behind walls of jargon and data. Databases like **PubMed** or **NASA Task Book** hold decades of discoveries — but they can feel distant, too technical, or overwhelming. Even modern AI tools require knowing exactly what to ask and how to interpret results.  

**Cellstronaut** bridges the gap between curiosity and understanding, turning dense research into readable, structured summaries while lowering the entry barrier.  

### Branches
- **Cellstronaut** – For students, enthusiasts, and anyone curious about life beyond Earth.  
- **Cellstronaut Pro** – For interdisciplinary scientists, educators, and engineers needing deeper, data-rich insights.  

Together, they form an ecosystem that transforms the challenge of understanding research into an experience of discovery.

> **Because every cell has a story — and each one deserves to be known.**

---

## 🧠 Motivation & Idea
Space biology is fascinating, but most sources are difficult for newcomers.  

We conducted a survey with engineers, biology students, and non-technical professionals from **Ukraine, Germany, and the USA**. Results showed curiosity is high, but articles are often overwhelming, long, or technically complex. Most respondents didn't know where to start.

---

## 🤖 Mossling — AI Research Assistant
A planned AI assistant, **Mossling**, will help users:  
- Highlight or cite text and ask follow-up questions instantly.  
- Bridge the gap between summaries and understanding.  
- Interpret data, clarify concepts, or find related studies across the Cellstronaut database.  

---

## 🛠️ Technology & How It Works

### Front-End
- HTML, CSS, JavaScript.  
- Intuitive navigation and search.  
- Four main categories: **Plants**, **Animals**, **Humans**, **Other**.  
- Tags for detailed browsing.  
- About section explaining space biology and project purpose.

### Back-End
#### PDF Processing & Text Extraction
- **PyMuPDF (fitz)** for text extraction.  
- Abstracts isolated; references, figures, tables removed.  
- Text cleaned and tokenized with **NLTK**.

#### Summarization
- **Transformer-based** summarizer (facebook/bart-large-cnn)  
- Generates short and full summaries (~800 words per article).

#### Key Findings & Tags
- NLP filters & regex identify result-oriented sentences.  
- Keywords extracted via **YAKE**, filtered for relevance.

#### Data Storage
- Articles saved as **JSON** objects: title, summaries, key findings, tags, metadata.  
- Modular design: extraction, summarization, tagging independent.  
- GPU acceleration for faster processing.  
- Automatic updates: new PDFs feed into the pipeline with zero manual input.

---

## 🌌 Cellstronaut Pro
- Professional branch for researchers, students, engineers.  
- In-depth, technical summaries, dense key findings, extended metadata.  
- Goal: reference hub across biology, space science, education, and engineering disciplines.  

---

## 🔮 Future Plans
- **Custom Summarization Models** trained specifically for space biology.  
- Mossling & Cellstronaut Pro rely on specialized models.  
- Expandable backend allows near real-time updates as new research appears.  

---

## 🌟 Epilogue
Cellstronaut is more than a website — it’s a growing archive of stories written in **genes, cells, and cosmic dust**. It connects curiosity with knowledge, bringing complex discoveries into clear light.  

Whether for students, scientists, or simply the curious, it makes space biology approachable, understandable, and inspiring.

---

[Visit Project](https://mossware.github.io/cellstronaut/) | [Demo Video](https://youtu.be/7WPAcLXrtyc) | [Space Apps Challenge Page](https://www.spaceappschallenge.org/2025/find-a-team/mossy/?tab=project)
