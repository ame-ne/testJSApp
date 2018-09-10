using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public QuestionEntity GetNext()
        {
            var random = new Random();
            var nextQuestionNumber = random.Next(QuestionEntities.Min(q => q.Id), QuestionEntities.Max(q => q.Id));
            return QuestionEntities.FirstOrDefault(x => x.Id == nextQuestionNumber);
        }

        public int TestInit()
        {
            var random = new Random();
            var selectedQuestionsCount = random.Next(1, QuestionEntities.Count());
            //var nQuestions = QuestionEntities.Take(selectedQuestionsCount);
            List<QuestionEntity> nQuestions = new List<QuestionEntity>();
            for (int i=0; i< selectedQuestionsCount; i++)
            {
                var selectedQuestion = GetNext();
                nQuestions.Add(selectedQuestion);
            }
            session.SetJson("nQuestions", nQuestions);
            return selectedQuestionsCount;
        }
    }
}
