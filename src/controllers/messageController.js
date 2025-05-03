const db = require("../db");
const utils = require("../utils");

const getMessagesByPhone = async (req, res, next) => {
  try {
    const phoneNumber = req.params.phoneNumber;
    const direction = req.query.direction;

    if (!utils.validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({
        error:
          "Invalid phone number format. Use international format with + prefix.",
      });
    }

    if (!utils.checkDatabaseExists()) {
      return res.status(500).json({
        error: "iMessage database not found",
      });
    }

    const rows = await db.getMessagesByPhoneNumber(phoneNumber);
    let messages = utils.formatMessages(rows);

    // Filter messages by direction if the parameter is specified
    if (direction === "incoming" || direction === "outgoing") {
      messages = messages.filter((message) => message.direction === direction);
    }

    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (err) {
    next(err);
  }
};

const sendMessage = async (req, res, next) => {
  try {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
      return res.status(400).json({
        error: "Phone number and message are required",
      });
    }

    if (!utils.validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({
        error:
          "Invalid phone number format. Use international format with + prefix.",
      });
    }

    // Sanitize input
    const sanitizedMessage = message.replace(/"/g, '\\"').replace(/\n/g, " ");
    const sanitizedPhoneNumber = phoneNumber.replace(/[^0-9+]/g, "");

    // Send the message
    const result = await utils.sendMessageViaAppleScript(
      sanitizedPhoneNumber,
      sanitizedMessage
    );

    res.status(201).json({
      success: true,
      data: {
        phoneNumber: sanitizedPhoneNumber,
        message: sanitizedMessage,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err) {
    next(err);
  }
};

const getAllMessages = async (req, res, next) => {
  try {
    // Get pagination parameters with defaults
    const limit = parseInt(req.query.limit) || 100;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    // Direction filter (optional)
    const direction = req.query.direction;

    if (!utils.checkDatabaseExists()) {
      return res.status(500).json({
        error: "iMessage database not found",
      });
    }

    const rows = await db.getAllMessages(limit, offset);
    let messages = utils.formatMessages(rows);

    // Filter messages by direction if the parameter is specified
    if (direction === "incoming" || direction === "outgoing") {
      messages = messages.filter((message) => message.direction === direction);
    }

    res.json({
      success: true,
      count: messages.length,
      page,
      limit,
      data: messages,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMessagesByPhone,
  sendMessage,
  getAllMessages,
};
