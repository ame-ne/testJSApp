using System.ComponentModel.DataAnnotations;

namespace testJSApp.Models
{
    public class QuestionEntity
    {
        public int Id { get; set; }

        [Display(Name = "Текст вопроса")]
        public string Text { get; set; }

        [Display(Name ="Вопросы")]
        public string Options { get; set; }

        [Display(Name = "Ответы")]
        public string Answers { get; set; }

        [Display(Name = "Время на ответ")]
        public int? Timeout { get; set; }
    }
}
