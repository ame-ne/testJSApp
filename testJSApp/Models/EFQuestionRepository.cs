using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using testJSApp.Infrastructure;

namespace testJSApp.Models
{
    public class EFQuestionRepository : ITestService
    {
        private ApplicationDbContext context;
        private ISession session;

        public EFQuestionRepository(ApplicationDbContext ctx, IHttpContextAccessor httpContextAccessor)
        {
            context = ctx;
            session = httpContextAccessor?.HttpContext.Session;
        }

        public IQueryable<QuestionEntity> QuestionEntities => context.QuestionEntities;

        public QuestionEntity GetNext(int id)
        {
            return session.GetJson<List<QuestionEntity>>("nQuestions")?.ElementAtOrDefault(id);
        }

        public int TestInit()
        {
            var random = new Random();
            var selectedQuestionsCount = random.Next(1, QuestionEntities.Count());
            List<QuestionEntity> nQuestions = new List<QuestionEntity>();

            var minQuestionId = QuestionEntities.Min(q => q.Id);
            var maxQuestionId = QuestionEntities.Max(q => q.Id);

            for (int i = 0; i < selectedQuestionsCount; i++)
            {
                var nextQuestionNumber = random.Next(minQuestionId, maxQuestionId);
                var selectedQuestion = QuestionEntities.FirstOrDefault(x => x.Id == nextQuestionNumber);
                nQuestions.Add(selectedQuestion);
            }
            session.SetJson("nQuestions", nQuestions);
            return selectedQuestionsCount;
        }
    }
}
