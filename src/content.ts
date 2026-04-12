// Shared content for the Volley homepage. Centralized so copy, links, and
// data stay in sync across components. Tone: calm, technical, factual.

export const links = {
  github: "https://github.com/volley-streams/volley",
  docs: "https://github.com/volley-streams/volley#documentation",
  quickstart: "https://github.com/volley-streams/volley#quick-start",
  kubernetes:
    "https://github.com/volley-streams/volley/blob/main/docs/KUBERNETES.md",
  architecture:
    "https://github.com/volley-streams/volley/blob/main/ARCHITECTURE.md",
  crateMap: "https://github.com/volley-streams/volley/blob/main/CRATE_MAP.md",
  agents: "https://github.com/volley-streams/volley/blob/main/AGENTS.md",
  contributing:
    "https://github.com/volley-streams/volley/blob/main/CONTRIBUTING.md",
  license: "https://github.com/volley-streams/volley/blob/main/LICENSE",
};

export interface Feature {
  title: string;
  description: string;
  icon: "bolt" | "spark" | "trace" | "code";
}

export const features: Feature[] = [
  {
    title: "Vectorized execution",
    description:
      "Operators process Apache Arrow RecordBatches natively. filter_expr, select_expr, and aggregate_expr delegate to DataFusion's vectorized kernels — no per-row dispatch, no SQL parsing.",
    icon: "bolt",
  },
  {
    title: "AI and ML ready",
    description:
      "Run ONNX and Candle models inline with GPU acceleration via CUDA, Metal, or CoreML. Call external model servers — vLLM, Triton, TGI — from async operators. HuggingFace Hub model loading is built in.",
    icon: "spark",
  },
  {
    title: "Per-record traceability",
    description:
      "OpenTelemetry trace context travels with each record. Configurable sampling (Always, Never, Ratio), W3C traceparent propagation on Kafka sources and sinks, and spans on every operator.",
    icon: "trace",
  },
  {
    title: "Code, not SQL",
    description:
      "A typed DataStream API written in Rust. Typestate enforces topology at compile time — missing sinks and operators after sinks fail to build. For non-trivial pipelines, code reads and refactors better than SQL.",
    icon: "code",
  },
];

export const codeSample = `use volley_core::prelude::*;
use volley_connector_kafka::{KafkaEnvExt, KafkaStreamExt};
use std::time::Duration;

#[tokio::main]
async fn main() -> Result<()> {
    let source = KafkaSourceConfig::new("localhost:9092", "events", "grp");
    let sink   = KafkaSinkConfig::new("localhost:9092", "aggregates");
    StreamExecutionEnvironment::new()
        .from_kafka(source).await?
        .filter_expr(col("amount").gt(lit(0)))
        .key_by(col("user_id"))
        .window(TumblingWindows::of(Duration::from_secs(60)))
        .aggregate_expr(sum(col("amount")))
        .to_kafka(sink).await?
        .execute("kafka-aggregation-job")
        .await
}`;
