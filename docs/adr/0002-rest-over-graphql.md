# REST over GraphQL

后端选 NestJS，该框架对 REST 和 GraphQL（`@nestjs/graphql`）都有成熟支持。需要决定 API 协议。

## 决策

采用 **REST + 共享 DTO 类型包**，通过 Monorepo 的 `packages/shared` 保证前后端类型一致。流式响应（AI 生成、助手回答）使用 **SSE** 补充。

## 拒绝的选项

- **GraphQL**：NestJS 的 `@nestjs/graphql` 集成成熟，但 GraphQL schema + resolver + N+1 问题增加开发复杂度。平台的交互模式是「学生看视频 + 答题 + 问 AI」，每个页面的数据需求固定可预测，GraphQL 的灵活查询在这个场景是过度设计。React Query + REST DTO 已经能覆盖全部数据获取需求。

## 后果

- Controller 层按资源组织（`/api/courses`, `/api/lessons`, `/api/knowledge-points` 等）。
- AI 流式输出使用 SSE endpoint，前端用 EventSource 消费。
- 共享 DTO 包需维护，但 Turborepo 保证了跨包构建的正确性。
