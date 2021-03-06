# musical-umbrella

## 목적
* Google에서 만든 Game Framework인 [boardgame.io](https://boardgame.io)를 사용해본다
* 턴제 게임과 실시간 게임의 차이를 느끼고, 실시간 게임을 위한 프레임워크에서 필요한 것은 무엇일지 생각해본다

## 게임 룰 설명
* 턴으로 돌아가면서 진행
* 각 턴별로 행동을 취할 수 있는 제한시간이 존재
* 머리로부터 한칸 거리로, 겹치지 않게 머리를 확장시킬 수 있음
* 모두가 확장시킬 수 없는 시점에서의 획득 칸이 가장 많은 플레이어가 승리

## 스크린샷
![screenshot](https://raw.githubusercontent.com/dplusic/musical-umbrella/5b338d3066c0780509441910824379f02da4a018/README_res/screenshot.png)

## [boardgame.io](https://boardgame.io) 사용기
* 약 한달 된 프로젝트임
* 초기 단계의 프로젝트이다 보니 문서화가 부족
* 온라인 멀티플레이를 위한 세션 관리 부분이 부족

## 개선할 점
* 기술
    * 턴제가 아닌 실시간으로 동기화된 멀티플레이를 구현
    * 세션 관리 개선 필요
* 룰
    * 차지할 수 있는 영역이 확정되면 개별적으로 종료
