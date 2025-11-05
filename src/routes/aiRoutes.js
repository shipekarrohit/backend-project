const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");
const {
  summarize,
  generateQuiz,
  transcribe,
} = require("../controllers/aiController");
const { logAction } = require("../utils/logger");

/**
 * @swagger
 * /api/ai/summarize:
 *   post:
 *     summary: Summarize text using GPT-4 (placeholder)
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Text to summarize
 *                 example: "Artificial Intelligence makes learning personalized and adaptive."
 *     responses:
 *       200:
 *         description: Successfully summarized text
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 summary:
 *                   type: string
 *                   example: "AI improves personalized learning."
 */
router.post("/summarize", authenticate, async (req, res) => {
  await summarize(req, res);
  if (res.statusCode === 200) {
    await logAction(req.user.id, "ai_summarize", "success");
  }
});

/**
 * @swagger
 * /api/ai/quiz:
 *   post:
 *     summary: Generate quiz questions (GPT-4 placeholder)
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Input text for generating quiz questions
 *                 example: "Explain the importance of Artificial Intelligence in education."
 *     responses:
 *       200:
 *         description: Successfully generated quiz
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - "What is Artificial Intelligence?"
 *                     - "How does AI improve learning efficiency?"
 */
router.post("/quiz", authenticate, async (req, res) => {
  await generateQuiz(req, res);
  if (res.statusCode === 200) {
    await logAction(req.user.id, "ai_quiz_generated", "success");
  }
});

/**
 * @swagger
 * /api/ai/transcribe:
 *   post:
 *     summary: Transcribe audio file using Whisper (placeholder)
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               audio:
 *                 type: string
 *                 format: binary
 *                 description: Audio file to be transcribed
 *     responses:
 *       200:
 *         description: Successfully transcribed audio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 transcript:
 *                   type: string
 *                   example: "This is a sample transcribed text."
 */
router.post("/transcribe", authenticate, async (req, res) => {
  await transcribe(req, res);
  if (res.statusCode === 200) {
    await logAction(req.user.id, "ai_transcribe", "success");
  }
});

module.exports = router;
