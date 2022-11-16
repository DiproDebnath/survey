const { Survey, Question, Answer, Choice } = require("../models");

module.exports = {
  getAllSurvey: async () => {
    const surveys = await Survey.findAll({
      include: [
        {
          model: Question,
          include: [
            {
              model: Choice,
            },
          ],
        },
      ],
    });
    if (!surveys) {
      return {
        success: false,
        status: 404,
        message: "no survey found",
      };
    }

    return {
      success: true,
      data: surveys,
    };
  },
  getSurveyById: async (id) => {
    let survey = await Survey.findOne({
      where: { id: id },
      include: [
        {
          model: Question,
          include: [
            {
              model: Choice,
            },
          ],
        },
      ],
    });

    if (!survey) {
      return {
        success: false,
        status: 404,
        message: "no survey found",
      };
    }

    return {
      success: true,
      data: survey,
    };
  },
  getResultById: async (id) => {
    let survey = await Survey.findOne({
      where: { id: id },
      include: [
        {
          model: Question,
          include: [
            {
              model: Answer,
              include: [
                {
                  model: Choice,
                  through: {
                    attributes: [],
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    if (!survey) {
      return {
        success: false,
        status: 404,
        message: "no survey found",
      };
    }

    return {
      success: true,
      data: survey,
    };
  },
  /**
   * 
   * @param {string} name 
   * @returns object
   */
  createSurvey: async (name) => {
    const survey = await Survey.create({
      name,
    });

    return {
      success: true,
      status: 201,
      data: survey,
    };
  },
 
  updateSurveyById: async (id, name) => {
   
      await Survey.update(
        {
          name: name,
        },
        {
          where: { id: id },
        }
      );
      return {
        success: true,
        status: 202,
        data: survey
      }
  },
};
