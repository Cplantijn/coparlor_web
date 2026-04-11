PROTO_SRC := ../../api/proto
OUT_DIR   := ./generated

# Absolute path to locally installed binaries — no global installs required
NODE_BIN  := $(abspath ../node_modules/.bin)
BUF       := $(NODE_BIN)/buf

.PHONY: generate clean

generate:
	@echo "Generating TypeScript from $(PROTO_SRC)..."
	@mkdir -p $(OUT_DIR)
	PATH="$(NODE_BIN):$$PATH" $(BUF) generate
	@echo "Done → $(OUT_DIR)"

clean:
	rm -rf $(OUT_DIR)
