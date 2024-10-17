import { A } from "@solidjs/router";
import { type Component, Index } from "solid-js";
import { skillSet } from "../../constants/skillSet";
import iconUrl from "/src/assets/icon.svg";

const Introduction: Component = () => {
  return (
    <div class="">
      <div class="mb-5">
        <h3 class="font-bold mb-4">Comment</h3>
        <div class="mb-4">
          <p>
            2018年からバックエンドエンジニアとしてAPIの開発等を行ってきました。
          </p>
          <p>2021年からはデータ基盤の設計/実装/構築をメインにしています。</p>
          <p>今後もデータ基盤に関わっていければと考えてます。</p>
          <p>お問い合わせはX(Twitter)へコメントかDMをお願いいたします🙏</p>
        </div>
      </div>
      <div class="mb-5">
        <h3 class="font-bold mb-4">Skill Set</h3>
        <div class="border-l-2 border-gray-200 pl-2">
          <Index each={Object.entries(skillSet)}>
            {(item) => {
              const [classification, details] = item();
              return (
                <div class="mb-4">
                  <h4 class="mb-1 text-sm">{classification}</h4>
                  <div class="overflow-x-auto">
                    <ul class="flex flex-nowrap space-x-1 pb-2">
                      <Index each={details}>
                        {(detail, i) => (
                          <li
                            id={`${i}`}
                            class={`${detail().bgColor} ${detail().textColor} text-xs p-1 rounded-md whitespace-nowrap`}
                          >
                            {detail().name}
                          </li>
                        )}
                      </Index>
                    </ul>
                  </div>
                </div>
              );
            }}
          </Index>
        </div>
      </div>
      <div class="flex items-center mb-5">
        <img
          src={iconUrl}
          alt="メインアイコン"
          class="rounded-full bg-slate-50 w-20 h-20"
        />
        <div class="pl-4">
          <div class="flex justify-between items-center py-1">
            <p class="font-semibold">FKeisuke</p>
            <div class="flex flex-row space-x-4">
              <A href="https://x.com/FKeisuke2">
                <i class="ri-twitter-x-line" />
              </A>
              <A href="https://github.com/kf3225">
                <i class="ri-github-line" />
              </A>
            </div>
          </div>
          <div class="py-1">
            <p class="">バックエンド/データエンジニア</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
