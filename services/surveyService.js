const { Survey, Question, Answer, Choice } = require("../models");

module.exports = {
  getAllSurvey: async () => {
    try {
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
    } catch (err) {
      console.log(err);
      return {
        success: false,
        status: 500,
        message: "Internal server error",
      };
    }
  },
  getSurveyById: async (id) => {
    try {
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
    } catch (err) {
      console.log(err);
      return {
        success: false,
        status: 500,
        message: "Internal server error",
      };
    }
  },
  getResultById: async (id) => {
    try {
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
    } catch (err) {
      console.log(err);
      return {
        success: false,
        status: 500,
        message: "Internal server error",
      };
    }
  },
  /**
   *
   * @param {string} name
   * @returns object
   */
  createSurvey: async (userId, name) => {
    try {
      const survey = await Survey.create({
        name,
        userId,
      });

      return {
        success: true,
        status: 201,
        data: survey,
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        status: 500,
        message: "Internal server error",
      };
    }
  },


  updateSurveyById: async (surveyId, userId, name) => {
    try {
      await Survey.update(
        {
          name: name,
          userId,
        },
        {
          where: { id: surveyId },
        }
      );
      const survey = await Survey.findOne({
        where: {
          id: surveyId,
        },
      });

      return {
        success: true,
        status: 202,
        data: survey,
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        status: 500,
        message: "Internal server error",
      };
    }
  },
  validateSurvey: async (userId, surveyId) => {
    try {
      let survey = await Survey.findOne({
        where: {
          id: surveyId,
        },
      });

      if (!survey) {
        return {
          success: false,
          status: 404,
          message: "no survey found",
        };
      }

      if (survey && survey.userId !== userId) {
        return {
          success: false,
          status: 401,
          message: "You are not owner of this survey",
        };
      }

      return {
        success: true,
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        status: 500,
        message: "Internal server error",
      };
    }
  },
};
