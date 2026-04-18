// Shared content for the Volley homepage. Centralized so copy, links, and
// data stay in sync across components. Tone: calm, technical, factual.

export const links = {
  github: "https://github.com/volley-streams/volley",
  docs: "https://docs.volley.run",
  quickstart: "https://docs.volley.run/getting-started/quickstart.html",
  kubernetes: "https://docs.volley.run/guides/horizontal-scaling.html",
  architecture: "https://docs.volley.run/architecture/overview.html",
  operators: "https://docs.volley.run/guides/operators.html",
  mlInference: "https://docs.volley.run/guides/ml-inference.html",
  contributing:
    "https://github.com/volley-streams/volley/blob/main/CONTRIBUTING.md",
  license: "https://github.com/volley-streams/volley/blob/main/LICENSE",
};

export interface Feature {
  title: string;
  description: string;
  icon: "bolt" | "spark" | "trace" | "code" | "dag";
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
  {
    title: "Multi-source, multi-sink DAGs",
    description:
      "Compose arbitrary topologies with tee() fan-out, union merges, N-way windowed joins, and content-based routing. Every epoch commits atomically across all sinks via cluster-wide 2PC over Arrow Flight, with a per-worker circuit breaker observable at /readyz.",
    icon: "dag",
  },
];

export const codeSample = `use std::time::Duration;
use volley_core::prelude::*;
use volley_connectors::memory::{MemorySink, MemorySource};

#[tokio::main]
async fn main() -> Result<()> {
    let tmp = tempfile::tempdir().unwrap();
    let sink = MemorySink::new();
    let output = sink.handle();                    // survives the move into to_sink()

    let report = StreamExecutionEnvironment::new()
        .from_source(MemorySource::new(records))
        .filter_expr(col("amount").gt(lit(100)))
        .key_by(col("user_id"))
        .window(TumblingWindows::of(Duration::from_secs(300)))
        .aggregate_expr(
            vec![sum(col("amount"))],
            RocksDbBackend::open(tmp.path().join("state")).unwrap(),
        )
        .to_sink(sink)
        .execute("aggregation-job")
        .await?;

    println!("{} epochs committed, {} rows",
        report.epochs_committed, output.lock().unwrap().len());
    Ok(())
}`;
