import Link from 'next/link';
import { CourseHero, MetricCards, Surface } from '../../components/PrototypeBlocks';
import { remediationItems, studentCourseCards } from '../../components/prototype-data';

export default function StudentHomePrototypePage() {
  return (
    <div className="space-y-6">
      <CourseHero
        roleLabel="Student Home"
        accent="#0F766E"
        actionLabel="进入我的课程"
        actionHref="/prototype/student/course"
        detail="学生工作台不再附属于教师顺序。现在它从自己的 home 出发，直达 Course、KnowledgeGraph、Lesson、Review 与 Progress，同时严格隐藏 teacher 草稿和审核状态。"
      />

      <MetricCards
        accent="#0F766E"
        items={[
          { label: '继续学习', value: studentCourseCards[0].title, note: studentCourseCards[0].next },
          { label: '待复习项目', value: `${remediationItems.length}`, note: '错误后的补救路径现在有了明确入口，不再隐含在 lesson 内。' },
          { label: '权限边界', value: 'published only', note: '学生只消费已发布内容和个人进度。' },
        ]}
      />

      <Surface
        eyebrow="Student Tasks"
        accent="#0F766E"
        title="学生首页强调继续学习与补救闭环"
        description="首页优先展示下一步学习动作，而不是泛化分析。这样学生一进入 workspace 就能继续 Course 学习流，并清楚知道哪里可以回看、补救或查看进度。"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/prototype/student/course" className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-teal-200 hover:bg-teal-50/60">
            <p className="text-lg font-semibold text-slate-950">我的课程</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">按 Course 进入学习，而不是从碎片页面跳进 Lesson。</p>
          </Link>
          <Link href="/prototype/student/review" className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-teal-200 hover:bg-teal-50/60">
            <p className="text-lg font-semibold text-slate-950">补救复习</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">把错题和弱 KnowledgePoint 汇总到一个明确的 review 入口。</p>
          </Link>
          <Link href="/prototype/student/progress" className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-teal-200 hover:bg-teal-50/60">
            <p className="text-lg font-semibold text-slate-950">学习进度</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">聚合 mastery、待办与下一个推荐 Lesson，形成学习闭环。</p>
          </Link>
        </div>
      </Surface>
    </div>
  );
}
